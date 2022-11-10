import oneImg from "../../assets/1.jpg";
import avatarImg from "../../assets/avatar.jpg";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import PageWrapper from "../../components/pagewrapper";
import NavBarWrapper from "../../components/navbarwrapper";
import Navpagewrapper from "../../components/navpagewrapper";
import { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { host } from "../host";
import { Route, Link, Routes, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffba3f",
  border: "none",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};
//{List:[]} update list = [] setxxx(list) setxxx(List:list)
const Home = () => {
  const navigate = useNavigate();
  const params = useParams(); //'634fdf39f48984c37b7a40b0' //String
  console.log(params);
  const [resultArray, setResultArray] = useState([]);
  const [data, setData] = useState({});
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(false);
  const [comment, setComment] = useState(false);
  const [copy, setCopy] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [finished, setFinished] = useState(false);
  const [posted, setPosted] = useState([]);

  useEffect(() => {
    const expensesListResp = async () => {
      await axios.get(host + "/recipes/" + params.id).then((response) => {
        setData(response.data.data);
      });
    };
    expensesListResp();
  }, []);

  useEffect(() => {
    const expensesListResp = async () => {
      await axios
        .get(host + "/recipes/didlike/" + params.id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("username"),
          },
        })
        .then((response) => {
          setLike(response.data);
        });
    };
    expensesListResp();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
  };

  const handleComent = () => {
    setFinished(true);
  };

  //delete funtion

  const handleClick =
    (() => {
      console.log("inside button");
      const expensesListResp = async () => {
        await axios
          .delete(host + "/recipes/" + params.id, {
            headers: {
              authorization: "Bearer " + localStorage.getItem("username"),
            },
          })
          .then((response) => setPosted(response.data.data))
          .catch((error) => {
            toast.error("You have no access to delete recipe");
          });
      };
      expensesListResp();
    },
    []);

  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box
          sx={{
            width: "100%",
            height: "64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", ml: "30px" }}>
            <ArrowBackIosIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <img
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              src={data.avatar}
            />
            <Typography sx={{ ml: "16px" }}>{data.author}</Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              axios
                .delete(host + "/recipes/" + params.id, {
                  headers: {
                    authorization: "Bearer " + localStorage.getItem("username"),
                  },
                })
                .then(navigate("/profile"))
                .catch((error) => {
                  toast.error("You have no access to delete recipe");
                });
            }}
          >
            Delete
          </Button>
          <Box sx={{ mr: "30px" }}>
            <IosShareOutlinedIcon onClick={() => setShare(true)} />
          </Box>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <img
              style={{ width: "100%", height: "500px" }}
              src={data.cover}
              alt=""
            />
          </Box>
          <Box sx={{ p: "32px", pb: "100px" }}>
            <Typography gutterBottom variant="h4" component="div">
              {data.title}
            </Typography>
            <Typography
              sx={{ mt: "30px" }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></Typography>
            <Box>
              <Typography gutterBottom variant="h4" component="div">
                Comments
              </Typography>
              <Box></Box>
            </Box>
          </Box>
        </Box>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation>
            <BottomNavigationAction
              onClick={() => {
                axios
                  .put(
                    host + "/recipes/like/" + params.id,
                    { userId: data.userId },
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("username"),
                      },
                    }
                  )
                  .then(console.log("successful"));

                setLike(!like);
              }}
              label="Home"
              icon={
                like ? (
                  <FavoriteIcon style={{ fill: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )
              }
            />
            <BottomNavigationAction
              onClick={() => setComment(true)}
              label="Home"
              icon={<CommentOutlinedIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Navpagewrapper>
      <Modal
        open={share}
        onClose={() => setShare(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Share</Typography>
            <HighlightOffIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setShare(false)}
            />
          </Box>
          <Box sx={{ display: "flex", background: "#fff", mt: "24px" }}>
            <Box sx={{ flex: 1, p: "10px 10px", overflow: "hidden" }}>
              {window.location.href}
            </Box>
            <Box
              sx={{
                width: "60px",
                borderLeft: "1px solid",
                p: "10px 10px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleCopy}
            >
              Copy
            </Box>
          </Box>
          <Box sx={{ mt: "24px" }}>
            {copy ? <Typography>The link has already copied !</Typography> : ""}
          </Box>
        </Box>
      </Modal>
      <Modal
        open={comment}
        onClose={() => setComment(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Comment</Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            {finished ? (
              <Typography sx={{ mt: "16px" }}>
                √ You had already submit your comment !
              </Typography>
            ) : (
              <TextField
                id="outlined-multiline-flexible"
                multiline
                rows={3}
                maxRows={4}
                value={commentText}
                sx={{ width: "100%", background: "#c3c3c3", mt: "16px" }}
                onChange={(e) => setCommentText(e.target.value)}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mt: "24px" }}>
            {!finished ? (
              <>
                <Button
                  onClick={() => setComment(false)}
                  sx={{ background: "#f57c18", color: "white" }}
                  variant="outlined"
                  color="warning"
                >
                  cancel
                </Button>
                <Button
                  onClick={handleComent}
                  sx={{ background: "#f57c18", color: "white", ml: "16px" }}
                  variant="outlined"
                  color="warning"
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setComment(false)}
                sx={{ background: "#f57c18", color: "white" }}
                variant="outlined"
                color="warning"
              >
                Okay
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </PageWrapper>
  );
};

export default Home;
