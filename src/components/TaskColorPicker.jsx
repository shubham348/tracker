import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const COLORS = [
  "#DBEAFE", // blue (default)
  "#FCE7F3", // pink
  "#FEF3C7", // yellow
  "#DCFCE7", // green
  "#EDE9FE", // purple
  "#ECFEFF", // cyan
  "#F1F5F9", // gray
];

function TaskColorPicker({ value, onChange }) {
  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      gap={2}
      flexWrap="wrap"
    >
      {COLORS.map((c) => {
        const selected = value === c;

        return (
          <Box
            key={c}
            onClick={() => onChange(c)}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: c,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: selected
                ? "2px solid #7C3AED"
                : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {selected && (
              <CheckIcon
                sx={{ fontSize: 18, color: "#111" }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default TaskColorPicker;
