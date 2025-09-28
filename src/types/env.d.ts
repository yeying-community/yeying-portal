// TypeScript 不认识 import.meta.env
// 为 import.meta.env 添加类型声明
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_MINIO_ENDPOINT: string
  readonly VITE_MINIO_ACCESS_KEY: string
  readonly VITE_MINIO_SECRET_KEY: string
  readonly VITE_MINIO_BUCKET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}