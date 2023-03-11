import { Box, createStyles, Text } from "@mantine/core";

type Props = {
  value: number;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  label?: string;
};

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.blue[8],
    border: `3px dashed ${theme.colors.orange[1]}`,
  },
}));

export const ValueCard = ({ value, suffix, prefix, label }: Props) => {
  const { classes } = useStyles();

  const formattedValue = value.toFixed(2);

  return (
    <Box className={classes.root}>
      {label && (
        <Text color={"white"} size="lg">
          {label}
        </Text>
      )}
      <div
        style={{
          color: "white",
        }}
      >
        {prefix}
        <Text display={"inline-block"} size={"md"} color={"white"}>
          {formattedValue}
        </Text>
        {suffix}
      </div>
    </Box>
  );
};
