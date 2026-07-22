import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

let cachedClient: S3Client | null = null;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required for Cloudflare R2 storage.`);
  return value;
}

export function getStorageConfig() {
  return {
    bucket: requireEnv("CLOUDFLARE_R2_BUCKET"),
    endpoint:
      process.env.CLOUDFLARE_R2_ENDPOINT ||
      `https://${requireEnv("CLOUDFLARE_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    accessKeyId: requireEnv("CLOUDFLARE_R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY"),
  };
}

export function getR2Client() {
  if (!cachedClient) {
    const config = getStorageConfig();
    cachedClient = new S3Client({
      region: "auto",
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return cachedClient;
}

export async function listProjectObjects(projectId: string, prefix = "") {
  const config = getStorageConfig();
  const response = await getR2Client().send(
    new ListObjectsV2Command({
      Bucket: config.bucket,
      Prefix: `${projectId}/${prefix}`,
    })
  );

  return (response.Contents || []).map((object) => ({
    key: (object.Key || "").replace(`${projectId}/`, ""),
    size: object.Size || 0,
    lastModified: object.LastModified?.toISOString() || new Date().toISOString(),
  }));
}

export async function putProjectObject(projectId: string, key: string, body: Buffer, contentType: string) {
  const config = getStorageConfig();
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: `${projectId}/${key}`,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function deleteProjectObject(projectId: string, key: string) {
  const config = getStorageConfig();
  await getR2Client().send(
    new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: `${projectId}/${key}`,
    })
  );
}
