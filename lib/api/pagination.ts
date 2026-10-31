export type Pagination = {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
};

export function parsePagination(
  params: URLSearchParams,
  options?: { defaultPageSize?: number; maxPageSize?: number }
): Pagination {
  const defaultPageSize = options?.defaultPageSize ?? 12;
  const maxPageSize = options?.maxPageSize ?? 50;

  const rawPage = Number(params.get("page"));
  const rawSize = Number(params.get("pageSize"));

  const page =
    Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const pageSize =
    Number.isInteger(rawSize) && rawSize >= 1
      ? Math.min(rawSize, maxPageSize)
      : defaultPageSize;

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}

export function buildMeta(total: number, pagination: Pagination) {
  return {
    total,
    page: pagination.page,
    pageSize: pagination.pageSize,
    totalPages: Math.max(1, Math.ceil(total / pagination.pageSize)),
  };
}