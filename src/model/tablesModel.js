export const getListTables = async (listTables) => {
  try {
    const temporalTables = [];
    for (let index = 1; index <= listTables; index += 1) {
      const thisTable = [];
      thisTable.push({
        id: index,
        status: false,
        mesa: false,
        itemsFromMesa: [],
      });
      temporalTables.push(thisTable[0]);
    }
    return temporalTables;
  } catch (e) {
    return e;
  }
};

export const getInfoTable = async () => "Nothing";
