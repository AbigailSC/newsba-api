export const verifyAccountTemplate = (code: string): string => {
  return `
    <div style="text-align: center;">
      <h1 style="color: #0d6efd;">Verify your account</h1>
      <p style="font-size: 1.2rem;">Your code is: <strong>${code}</strong></p>
    </div>
  `;
};
