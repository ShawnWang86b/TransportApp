import dayjs from "dayjs";

const formatDate = (date: string) => {
  return dayjs(date).format("HH:mm a ");
};

export default formatDate;
