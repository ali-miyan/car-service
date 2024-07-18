export const parseSubService = (service: [string, string]) => {
    const subServiceArray = JSON.parse(service[0]);
    const detail = JSON.parse(service[1]);
    return subServiceArray.map((item: any) => ({
      _id: item._id,
      name: item.name,
      detail: {
        price: Number(detail.price),
        workingHours: Number(detail.workingHours),
      },
    }));
  };