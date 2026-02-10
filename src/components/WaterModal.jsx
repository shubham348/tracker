import {
    Box,
    Typography,
    Dialog,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

/* quick presets */
const PRESETS = [
    { label: "150 ml", value: 150, icon: "☕" },
    { label: "300 ml", value: 300, icon: "🥛" },
    { label: "500 ml", value: 500, icon: "🧃" },
    { label: "800 ml", value: 800, icon: "🚰" },
    { label: "1 L", value: 1000, icon: "🍼" },
];

function WaterModal({ open, onClose, onSubmit }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [value, setValue] = useState("0");

    const addDigit = (d) => {
        setValue((v) => (v === "0" ? String(d) : v + d));
    };

    const backspace = () => {
        setValue((v) => (v.length <= 1 ? "0" : v.slice(0, -1)));
    };

    const confirm = () => {
        const amt = Number(value);
        if (!amt || amt <= 0) return;
        onSubmit(amt);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            TransitionProps={{
                onExited: () => setValue("0"), // ✅ reset AFTER close animation
            }}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? "24px 24px 0 0" : 2,
                    position: isMobile ? "fixed" : "relative",
                    bottom: isMobile ? 0 : "auto",
                    m: 0,
                },
            }}
        >
            {/* HEADER */}
            <Box
                px={3}
                py={1.5}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography fontWeight={600} fontSize={24}>Add water</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* AMOUNT */}
            <Typography
                textAlign="center"
                fontSize={40}
                fontWeight={600}
                my={1}
            >
                {value} ml
            </Typography>

            {/* PRESETS */}
            <Box
                display="flex"
                justifyContent="space-between"
                px={2}
                py={2}
                bgcolor="#DBECFF"
            >
                {PRESETS.map((p) => (
                    <Box
                        key={p.value}
                        textAlign="center"
                        onClick={() => setValue(String(p.value))}
                        sx={{ cursor: "pointer" }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                bgcolor: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 0.5,
                                fontSize: 20,
                            }}
                        >
                            {p.icon}
                        </Box>
                        <Typography variant="caption">{p.label}</Typography>
                    </Box>
                ))}
            </Box>

            {/* KEYPAD */}
            <Box px={2} py={2} bgcolor="#DBECFF">
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={1.5}
                >
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((n) => (
                        <Key
                            key={n}
                            onClick={() => addDigit(n)}
                        >
                            {n}
                        </Key>
                    ))}

                    <Key onClick={backspace}>
                        <BackspaceIcon />
                    </Key>

                    <Key onClick={() => addDigit(0)}>0</Key>

                    <Key
                        onClick={confirm}
                        sx={{
                            bgcolor: "#000",
                            color: "#fff",
                        }}
                    >
                        ✓
                    </Key>
                </Box>
            </Box>
        </Dialog>
    );
}

function Key({ children, onClick, sx }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                height: 56,
                borderRadius: 3,
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 600,
                cursor: "pointer",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

export default WaterModal;
