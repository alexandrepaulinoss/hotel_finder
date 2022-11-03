const ClientType = {
  isValid: function (type) {
    return type.toLowerCase() === "regular" || type.toLowerCase() === "reward";
  },
};

export { ClientType };
