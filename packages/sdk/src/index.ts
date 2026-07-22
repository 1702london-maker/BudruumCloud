type QueryParams = Record<string, string>;

class QueryBuilder<T = Record<string, unknown>> {
  private params: QueryParams = {};

  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly projectId: string,
    private readonly table: string
  ) {}

  select(columns = "*") {
    this.params.select = columns;
    return this;
  }

  eq(column: string, value: string | number | boolean) {
    this.params[`eq.${column}`] = String(value);
    return this;
  }

  limit(count: number) {
    this.params.limit = String(count);
    return this;
  }

  async insert(values: Partial<T> | Partial<T>[]): Promise<{ data: T[] | null; error: string | null }> {
    const response = await fetch(
      `${this.baseUrl}/api/v1/projects/${this.projectId}/rest/${this.table}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    return response.json();
  }

  async execute(): Promise<{ data: T[] | null; error: string | null }> {
    const query = new URLSearchParams(this.params);
    const response = await fetch(
      `${this.baseUrl}/api/v1/projects/${this.projectId}/rest/${this.table}?${query.toString()}`,
      { headers: { Authorization: `Bearer ${this.key}` } }
    );
    return response.json();
  }

  then<TResult1 = { data: T[] | null; error: string | null }, TResult2 = never>(
    onfulfilled?: ((value: { data: T[] | null; error: string | null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export function createClient(baseUrl: string, anonKey: string, options: { projectId: string }) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return {
    from<T = Record<string, unknown>>(table: string) {
      return new QueryBuilder<T>(normalizedBaseUrl, anonKey, options.projectId, table);
    },
    db: {
      from<T = Record<string, unknown>>(table: string) {
        return new QueryBuilder<T>(normalizedBaseUrl, anonKey, options.projectId, table);
      },
    },
  };
}
