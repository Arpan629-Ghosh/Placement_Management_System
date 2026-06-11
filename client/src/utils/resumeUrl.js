export const getResumeProxyUrl = (
  url,
  publicId = "",
  format = "pdf",
  version = "",
  download = false,
) => {
  if (!url) return "";

  const proxyUrl = `/api/student/resume/preview?url=${encodeURIComponent(url)}&publicId=${encodeURIComponent(publicId)}&format=${encodeURIComponent(format)}${version ? `&version=${encodeURIComponent(version)}` : ""}`;

  return download ? `${proxyUrl}&download=1` : proxyUrl;
};
