import * as React from 'react';
import { ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HeaderSideMenu from './HeaderSideMenu';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DatasetIcon from '@mui/icons-material/Dataset';
import PersonIcon from '@mui/icons-material/Person';
import ThreePIcon from '@mui/icons-material/ThreeP';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import FolderIcon from '@mui/icons-material/Folder';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Tprimary1, TMMenuBG, TSMenuBG } from '../../Utils/constants';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface LThemeProps {
  children: ReactNode;
}

export default function LTheme({ children }: LThemeProps) {
  let location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubMenu, setOpenSubMenu] = React.useState<any>('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleSubMenuClick = (params: any) => {
    if (openSubMenu === params) {
      setOpenSubMenu(false);
    } else {
      setOpenSubMenu(params);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      to: "dashboard",
      submenu: [
        {
          title: "HO Dashboard",
          href: "/dashboard",
          icon: <PanoramaFishEyeIcon />
        },
      ]
    },
    {
      title: "Master Data",
      icon: <DatasetIcon />,
      to: "company",
      submenu: [
        {
          title: "Company Profile",
          href: "/company",
          icon: <PanoramaFishEyeIcon />
        },
        {
          title: "Staff Info",
          href: "/staff",
          icon: <PanoramaFishEyeIcon />
        }
      ],
    },
    {
      title: "Staff",
      icon: <ThreePIcon />,
      to: "#",
      submenu: [
        {
          title: "Staff Profile",
          icon: <PanoramaFishEyeIcon />,
          href: ""
        }
      ]
    },
    {
      title: "Reports",
      icon: <FolderIcon />,
      to: "#",
      submenu: [
        {
          title: "Cash Book",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Voucher Payment",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Due Renewal",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Loan Request",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Loan Approval",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Loan Disbursement",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "EMI Due",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Loan Over Due",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Loan Outstanding",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "EMI Collection",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        },
        {
          title: "Payment",
          icon: <PanoramaFishEyeIcon />,
          href: "",
        }
      ]
    }
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#045b62" }}>
        <Grid container spacing={2} py={1}>
          <Grid size={{ md: 11 }} px={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
              FinApp
            </Typography> */}
          </Grid>
          <Grid size={{ md: 1 }} px={2}>
            <HeaderSideMenu />
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: Tprimary1, // Set background color
            color: 'white', // Set text color
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            src="https://vite.dev/logo.svg"
            alt="School Management System"
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              marginRight: '10px',
            }}
          />
          <Typography style={{ marginRight: '20px', fontSize: '16px' }} className='mr-30' noWrap component="div">
            <b>School Management System</b>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "#FFF" }} /> : <ChevronRightIcon sx={{ color: "#FFF" }} />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {
            menuItems.map((mitem: any, index: number) => {
              const isActiveMenu = mitem.to && location.pathname.startsWith("/" + mitem.to) ||
                mitem?.submenu?.some((submenuitem: any) => submenuitem.href && location.pathname.startsWith(submenuitem.href));
              return (
                <div key={index}>
                  <ListItem sx={{ backgroundColor: isActiveMenu ? TMMenuBG : "", }} key={mitem} disablePadding onClick={(e) => mitem?.submenu?.length > 0 && handleSubMenuClick(mitem.title)} >
                    <ListItemButton component={Link} to={"#"} >
                      <ListItemIcon sx={{ minWidth: '30px', color: location.pathname == mitem.to ? "#343a40" : "#ffffffe6" }} >
                        {mitem?.icon}
                      </ListItemIcon>

                      <ListItemText primary={mitem.title} />
                      {mitem?.submenu?.length > 0 && (mitem.title === openSubMenu || isActiveMenu ? <ExpandLess /> : <ExpandMore />)}

                    </ListItemButton>
                  </ListItem>

                  {(() => {
                    if (mitem?.submenu?.length > 0) {
                      return (
                        <Collapse key={'coll_' + index} in={mitem.title === openSubMenu || isActiveMenu} timeout="auto" unmountOnExit>
                          <List key={'colllist_' + index} component="div" disablePadding>
                            {
                              mitem?.submenu?.map((submenuitem: any, idx2: number) => {
                                const isSubmenuActive = location.pathname.startsWith(submenuitem.href);

                                return (
                                  <ListItem key={'ddlist_' + idx2} disablePadding sx={{
                                    backgroundColor: isSubmenuActive ? TSMenuBG : "",
                                    color: isSubmenuActive ? "#343a40" : "#ffffffe6"
                                  }}>
                                    <ListItemButton component={Link} to={submenuitem?.href} sx={{ pl: 4 }} key={'ddlist1_' + idx2}>
                                      <ListItemIcon sx={{
                                        minWidth: '30px',
                                        color: isSubmenuActive ? "#343a40" : "#ffffffe6"
                                      }}>
                                        {submenuitem?.icon}
                                      </ListItemIcon>
                                      <ListItemText
                                        sx={{
                                          '& .MuiListItemText-primary': {
                                            fontSize: '14px', // Change primary text font size
                                          },
                                          '& .MuiListItemText-secondary': {
                                            fontSize: '12px', // Change secondary text font size
                                          },
                                        }}
                                      >
                                        {submenuitem?.title}
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                )
                              })
                            }
                          </List>
                        </Collapse>
                      )
                    }
                  })()}
                </div>
              )
            })
          }
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
        {children}
        {/* </Paper> */}
      </Main>
      <footer style={{
        bottom: '0',
        width: "100%",
        textAlign: 'center',
        backgroundColor: "#045b62",
        color: 'white',
        position: "fixed",
        height: "30px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p>&copy; {new Date().getFullYear()}- MyCompany Solutions</p>
      </footer>
    </Box>
  );
}
