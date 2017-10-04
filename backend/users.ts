export class User {

  constructor(
    public email: string,
    public name: string,
    private password: string
  ) { }

  public matches(another: User): boolean {

    const usuarioSaoIguais = another !== undefined &&
      another.email === this.email &&
      another.password === this.password;

    return usuarioSaoIguais;
  }
}

export const users: { [key: string]: User } = {
  'werter@hotmail.com.br': new User('werter@hotmail.com.br', 'werter', 'asdf'),
  'user@hotmail.com': new User('user@hotmail.com', 'usuario', '1234')
}
