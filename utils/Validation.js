export const checkValidation = (amount, title) => {
    const err = {}
    if (!title.trim()) {
      err.title = "Please enter a title"
    }
    if (!amount.trim()) {
      err.amount = "Please enter a amount"
    } else if (amount.match(/[a-z]/i)) {
      err.amount = "Please add only number"
    } else if (!amount.startsWith("+") && !amount.startsWith("-")) {
      err.amount = "Please enter a sign before amount"
    }
    return err
  }