import React, {FC, ReactNode} from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type SideBlockPropsType = {
    title: string
    children: ReactNode
}
export const SideBlock: FC<SideBlockPropsType> = ({title, children}) => {
    return (
        <Paper classes={{root: styles.root}}>
            <Typography variant="h6" classes={{root: styles.title}}>
                {title}
            </Typography>
            {children}
        </Paper>
    );
};
