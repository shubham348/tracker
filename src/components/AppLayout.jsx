import { Box, Typography } from "@mui/material";

function AppLayout({ title, subtitle, children }) {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      {/* HEADER */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          color: "#fff",
          pt: { xs: 3, sm: 5 },
          pb: { xs: 4, sm: 6 },
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={800}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            mt={1}
            sx={{ opacity: 0.9, fontSize: 14 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* CONTENT CONTAINER */}
      <Box
        sx={{
          maxWidth: 680,          // ✅ wider on desktop
          mx: "auto",
          mt: -4,
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,     // ✅ much less rounded
            boxShadow:
              "0 12px 24px rgba(0,0,0,0.1)",
            p: { xs: 2, sm: 3 },
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
