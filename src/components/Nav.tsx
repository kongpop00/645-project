import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "../utils/app";
import { useMediaQuery } from "@mui/material";
import logo from "@assets/logo.jpg"
interface Props {
  window?: () => Window;
}

interface NavItem {
  key: string;
  wordding: string;
  color: string;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { t, i18n } = useTranslation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<string>("");
  const isSmallScreen = useMediaQuery("(max-width:820px)");
  const open = Boolean(anchorEl);

  const navItems: NavItem[] = [
    { key: "Home", wordding: t("navbar.serectionHome"), color: "#3a611d" },
    {
      key: "Portfolio",
      wordding: t("navbar.serectionPortfolio"),
      color: "#96b469",
    },
    {
      key: "AboutUs",
      wordding: t("navbar.serectionAboutUs"),
      color: "#b99b79",
    },
    {
      key: "FeedBack",
      wordding: t("navbar.serectionFeedBack"),
      color: "#bdbdbd",
    },
  ];

  const handleClick = (item: string) => {
    console.log("item", item);
    setSelectedItem(item);
    scrollToSection(item);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng: any) => {
    i18n.changeLanguage(lng);
    handleClose();
    document.documentElement.lang = lng;
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "#fff",
       
      }}
    >
      <Typography
        variant="h6"
        sx={{ my: 2 }}
        onClick={() => handleClick("Home")}
      >
        <img
          src={logo}
          alt=""
          style={{ maxWidth: "200px", maxHeight: "100px" }}
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.key}
            disablePadding
            onClick={() => handleClick(item.key)}
          >
            <ListItemButton
              sx={{
                textAlign: "center",
                color: item.color,
                transition: "background-color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                  transform: "scale(1.05)",
                },
              }}
            >
              <ListItemText
                primary={item.wordding}
                sx={{
                  borderBottom:
                    selectedItem === item.key ? "2px solid #3a611d" : "none",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mb: "56px" }}>
      <AppBar component="nav" sx={{ boxShadow: 1 }}>
        <Box display={"flex"} justifyContent={"center"}>
          <Toolbar sx={{ width: "100%", maxWidth: { xs: "1280px" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                pl: "20px",
                display: isSmallScreen ? "flex" : "none",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <MenuIcon onClick={handleDrawerToggle} />
              <Box>
                <IconButton
                  aria-label="language"
                  onClick={handleLanguageClick}
                  sx={{ ml: 2 }}
                >
                  <LanguageIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={() => handleLanguageChange("en")}>
                    English
                  </MenuItem>
                  <MenuItem onClick={() => handleLanguageChange("th")}>
                    Thai
                  </MenuItem>
                </Menu>
              </Box>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: isSmallScreen ? "none" : "flex",
              }}
              onClick={() => handleClick("Home")}
            >
              <img
                src={logo}
                alt=""
                style={{ maxWidth: "200px", maxHeight: "100px" }}
              />
            </Typography>
            <Box
              sx={{
                display: isSmallScreen ? "none" : "flex",
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  sx={{
                    pb: "23px",
                    mt: "20px",
                    width: "120px",
                    borderRadius: 0,

                    color: item.color,
                    borderBottom:
                      selectedItem === item.key
                        ? `2px solid ${item.color}`
                        : "none",
                    transition: "border-bottom 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      borderBottom: `2px solid ${item.color}`,
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => handleClick(item.key)}
                >
                  <Box sx={{ fontSize: "15px" }}>{item.wordding}</Box>
                </Button>
              ))}

              <IconButton
                aria-label="language"
                onClick={handleLanguageClick}
                sx={{ ml: 2 }}
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ mt: "0px" }}
              >
                <MenuItem onClick={() => handleLanguageChange("en")}>
                  English
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange("th")}>
                  Thai
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: !isSmallScreen ? "none" : "flex",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#fff",
              border: "0.7px solid #A0ABC0",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

const btnLoad = {
  backgroundColor: "#1E9DB9",
  color: "#fff",
  borderRadius: "24px",
  fontSize: "12px",
  height: "30px",
  width: "100px",
  transition: "background-color 0.3s ease, transform 0",
};
