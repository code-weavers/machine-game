import { Box } from "@mantine/core";

interface Props {
  money: number;
}

export const MoneyCounter = ({ money }: Props) => {
  return (
    <div>
      <Box p={"md"} sx={{ border: "1px solid #eee" }}>
        Money: {money}
      </Box>
    </div>
  );
};
