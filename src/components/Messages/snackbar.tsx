import React, { useState, forwardRef, useCallback } from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core";
import { useSnackbar, SnackbarContent } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Message } from "../../store/slices/messages-slice";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import SuccessIcon from "@mui/icons-material/CheckCircle";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles: any = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            minWidth: "344px !important",
        },
        maxWidth: 500,
    },
    card: {
        width: "100%",
    },
    error: {
        "&.MuiPaper-rounded.MuiPaper-elevation1": {
            backgroundColor: "#d32f2f",
        },
    },
    info: {
        "&.MuiPaper-rounded.MuiPaper-elevation1": {
            backgroundColor: "#2979ff",
        },
    },
    warning: {
        "&.MuiPaper-rounded.MuiPaper-elevation1": {
            backgroundColor: "#ffa000",
        },
    },
    success: {
        "&.MuiPaper-rounded.MuiPaper-elevation1": {
            backgroundColor: "#43a047",
        },
    },
    actionRoot: {
        padding: "8px 8px 8px 16px",
        justifyContent: "space-between",
        color: "#FFFFFF",
    },
    icons: {
        marginLeft: "auto",
    },
    expand: {
        padding: "8px 8px",
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        "&.MuiIconButton-sizeMedium": {
            color: "#FFFFFF",
        },
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    collapse: {
        padding: 16,
    },
    checkIcon: {
        fontSize: 20,
        color: "#b3b3b3",
        paddingRight: 4,
    },
    checkIconCopy: {
        color: "#43a047",
    },
    button: {
        padding: 0,
        textTransform: "none",
    },
    errorWrap: {
        marginTop: 10,
    },
    errorText: {
        whiteSpace: "pre-wrap",
        maxHeight: 300,
        overflow: "auto",
        background: "rgba(0,0,0,0.1)",
        padding: 5,
        borderRadius: 5,
    },
}));

const SnackMessage = forwardRef<HTMLDivElement, { id: string | number; message: Message }>((props, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);
    const [isCopy, setIsCopy] = useState(false);

    const handleExpandClick = useCallback(() => {
        setExpanded(oldExpanded => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
        closeSnackbar(props.id);
    }, [props.id, closeSnackbar]);

    const getIcon = (severity: string) => {
        switch (severity) {
            case "error":
                return <ErrorIcon color="inherit" />;
            case "info":
                return <InfoIcon color="inherit" />;
            case "success":
                return <SuccessIcon color="inherit" />;
            case "warning":
                return <WarningIcon color="inherit" />;
            default:
                return <div />;
        }
    };

    return (
        <SnackbarContent ref={ref} className={classes.root}>
            <Card className={classnames(classes.card, classes[props.message.severity])}>
                <CardActions classes={{ root: classes.actionRoot }}>
                    {getIcon(props.message.severity)}
                    <Typography sx={{ marginLeft: "0.5rem", opacity: "0.9" }} variant="subtitle2" className={classes.typography}>
                        {props.message.text}
                    </Typography>
                    <div className={classes.icons}>
                        {props.message.error && (
                            <IconButton aria-label="Show more" className={classnames(classes.expand, { [classes.expandOpen]: expanded })} onClick={handleExpandClick}>
                                <ExpandMoreIcon color="inherit" />
                            </IconButton>
                        )}
                        <IconButton className={classes.expand} onClick={handleDismiss}>
                            <CloseIcon color="inherit" />
                        </IconButton>
                    </div>
                </CardActions>
                <Collapse in={expanded} timeout={5000000} unmountOnExit>
                    <Paper className={classes.collapse}>
                        <CopyToClipboard text={JSON.stringify(props.message.error)} onCopy={() => setIsCopy(true)}>
                            <Button size="small" className={classes.button}>
                                <CheckCircleIcon className={classnames(classes.checkIcon, { [classes.checkIconCopy]: isCopy })} />
                                Copy to clipboard
                            </Button>
                        </CopyToClipboard>
                        <div className={classes.errorWrap}>
                            <Typography>Error message: </Typography>
                            <Typography className={classes.errorText}>{JSON.stringify(props.message.error, null, 2)}</Typography>
                        </div>
                    </Paper>
                </Collapse>
            </Card>
        </SnackbarContent>
    );
});

export default SnackMessage;
