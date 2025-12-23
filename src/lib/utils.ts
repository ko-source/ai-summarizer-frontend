export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const KB_SIZE = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const index = Math.floor(Math.log(bytes) / Math.log(KB_SIZE));
  return Math.round((bytes / Math.pow(KB_SIZE, index)) * 100) / 100 + " " + sizes[index];
};