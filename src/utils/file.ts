const validImageRexp: RegExp = /.+\.(jpeg|jpg|png)$/;

export function validateImageFile(file: File) {
    return validImageRexp.test(file.name);
}