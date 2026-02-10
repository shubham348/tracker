import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function WaterCard({ total, goal, onAdd }) {
  return (
    <Box
      p={2}
      mb={3}
      borderRadius={3}
      bgcolor="#DBEAFE"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" gap={2} alignItems="center">
        <Typography fontSize={28}>💧</Typography>

        <Box>
          <Typography fontSize={13} color="text.secondary">
            {total}/{goal} ml
          </Typography>
          <Typography fontWeight={600}>
            Drink Water
          </Typography>
        </Box>
      </Box>

      <IconButton
        onClick={onAdd}
        sx={{
          bgcolor: "#fff",
          border: "1px solid #CBD5E1",
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default WaterCard;
