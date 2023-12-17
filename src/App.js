import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listitems";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, CardActionArea, InputLabel, Stack } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import CalculateIcon from "@mui/icons-material/Calculate";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useSound from 'use-sound';
import correctSound from './correctSound.mp3';
import wrongSound from './wrongSound.mp3'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#3f51b5",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor: "transparent",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const questions = [
  {
    question: "Berapakah nilai 2+2?",
    choices: [4, 5, 6],
    correctAnswer: 4,
  },
  {
    question: "Tulang buang T jadi apa?",
    choices: ["ulang", "Kulang", "Bulang"],
    correctAnswer: "ulang",
  },
  {
    question: "Berapakah nilai 2+5?",
    choices: [4, 5, 7],
    correctAnswer: 7,
  },
  {
    question: "Berapakah nilai 2+3?",
    choices: [4, 5, 6],
    correctAnswer: 5,
  },
  // Add more questions here
];
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [timer, setTimer] = React.useState(30);
  const [playWrong] = useSound(wrongSound);
  const [playCorrect] = useSound(correctSound);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(countdown);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(30);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, currentQuestionIndex]);

  

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
      playCorrect();
    }else{
      playWrong();
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(30);
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <CalculateIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              Math2Score
            </Typography>
            <IconButton color="inherit">
              <Avatar src="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/2021-05/iStock-152956849.jpg?itok=1OWnHDdd"></Avatar>
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={2} direction="column">
              <Typography variant="h4">Mathematic Form 4</Typography>
              <Divider />
              <Box sx={{ height: 10 }} />
              <Stack spacing={2} direction="column">
                {currentQuestionIndex < questions.length ? (
                  <Card sx={{ minWidth: 345 }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Quiz 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {questions[currentQuestionIndex].question}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Time remaining: {timer} seconds
                        </Typography>
                        <InputLabel>Answer</InputLabel>
                        <Stack spacing={2}>
                          {questions[currentQuestionIndex].choices.map(
                            (choice) => (
                              <Button
                                key={choice}
                                variant="contained"
                                color={
                                  selectedAnswer === choice &&
                                  selectedAnswer ===
                                    questions[currentQuestionIndex]
                                      .correctAnswer
                                    ? "success"
                                    : "primary"
                                }
                                onClick={() => checkAnswer(choice)}
                              >
                                {choice}
                              </Button>
                            )
                          )}
                        </Stack>
                        <Typography variant="body3" color='text-secondary'>{currentQuestionIndex + 1} of {questions.length}</Typography>
                      </CardContent>
                     
                    </CardActionArea>
                  </Card>
                ) : (
                  <>
                    <Typography variant="h5" component="div">
                      Quiz finished. You got {correctAnswers} out of{" "}
                      {questions.length} correct.
                    </Typography>
                    <Button variant="contained" onClick={retryQuiz}>
                      Retry
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
