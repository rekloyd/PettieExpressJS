export const validarEmail = (email: string): boolean => {
    const regex = /^[^@]+@[^@]+$/;
    return regex.test(email);
  };
  