import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {useRef} from 'react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, CardActionArea, InputLabel, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import useSound from 'use-sound';
import correctSound from './correctSound.mp3';
import wrongSound from './wrongSound.mp3'
import LinearProgress from '@mui/material/LinearProgress';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';



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
  {
    question: "Sila teka umur Saya?",
    choices: [14, 15, 23],
    correctAnswer: 15,
  },
];
// TODO remove, this demo shouldn't need to reset the theme.


export default function Quiz() {
  const [open, setOpen] = React.useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [timer, setTimer] = React.useState(30);
  const [playWrong] = useSound(wrongSound);
  const [playCorrect] = useSound(correctSound);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const videoRef = useRef();
  const [quizStarted, setQuizStarted] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    let countdown = null;
  if(quizStarted){
    if (timer === 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
    } else {
      countdown = setInterval(() => {
        setTimer((timer) => timer > 0 ? timer - 1 : 0);
      }, 1000);
    }}
  
    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [timer, currentQuestionIndex,quizStarted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video.currentTime >= 60) {
      setShowQuiz(true);
      setQuizStarted(true)
      // Remove the event listener to prevent it from being triggered again
      video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  };

  

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
                  <video 
                    ref={videoRef}
                    src="https://firebasestorage.googleapis.com/v0/b/mycarrymark.appspot.com/o/files%2FMasdo%20%E2%80%93%20Pujaanku%20(feat.%20Aisyah%20Aziz)%20%5BAudio%20Rasmi%5D.mp4?alt=media&token=c82a551a-342e-43c4-b1b5-139c79677db4" 
                    title="Title of the video"
                    controls
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    style={{ width: '100%' }}
                />
                <Typography variant="h5" component="div">Pujaan Hatiku - Masdo dan Aisyah Aziz</Typography>
                <Stack direction='row' spacing={2}>
                <Avatar src="https://i.ytimg.com/vi/2Z3f6g2Zj1M/maxresdefault.jpg" />
                <Typography variant="h6" > Masdo Cikgu Musik</Typography>
                
                <IconButton color="primary" aria-label="add to shopping cart">
                    <ThumbUpIcon />
                </IconButton>
                </Stack>
                  <CardMedia
                    />
                    {showQuiz && (
                      <CardContent>
                      <LinearProgress variant="determinate" value={(timer / 30) * 100} />
                      <Typography variant="body2" color="text.secondary">
                          Time remaining: {timer} seconds
                      </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                        Quiz 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {questions[currentQuestionIndex].question}
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
                      </CardContent>)}
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

  );
}
