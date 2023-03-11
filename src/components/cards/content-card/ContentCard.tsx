import { Box, createStyles } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.blue[8],
    borderRadius: theme.radius.md,
    border: `8px solid ${theme.colors.orange[2]}`,
  },
}));

export const ContentCard = ({ children }: Props) => {
  const { classes } = useStyles();

  return <Box className={classes.root}>{children}</Box>;
};
