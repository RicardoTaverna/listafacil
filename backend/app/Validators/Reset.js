class Reset {
  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed',
      // validation rules
    };
  }
}

module.exports = Reset;
