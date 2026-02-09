import { Box, Typography, Button } from "@mui/material";

function EmptyState({ onAdd }) {
  return (
    <Box
      mt={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      px={3}
    >
      <Typography fontSize={48}>✨</Typography>

      <Typography
        variant="h6"
        mt={2}
        fontWeight={600}
      >
        No tasks for today
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
        sx={{ maxWidth: 280 }}
      >
        Start small. Track daily habits and
        build consistency over time.
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={onAdd}
      >
        Add your first task
      </Button>
    </Box>
  );
}

export default EmptyState;
