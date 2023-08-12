import React, {FC} from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import {SideBlock} from "./SideBlock";
import {useAppDispatch} from "../redux/store";
import {setSortByTagName} from "../redux/slices/posts/posts";

type TagsBlockPropsType = {
    items: string[]
    isLoading: boolean
}

export const TagsBlock: FC<TagsBlockPropsType> = ({items, isLoading = true}) => {

    const dispatch = useAppDispatch()
    const sortByTagName = (name: string) => {
        dispatch(setSortByTagName(name))
    }

    return (
        <SideBlock title="Тэги">
            <List>
                {isLoading ? (
                    [...Array(5)].map((_, i) => (
                        <ListItem key={i} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon/>
                                </ListItemIcon>
                                <Skeleton width={100}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    items.map((name, i) => (
                        <span
                            key={name}
                            style={{textDecoration: "none", color: "black"}}
                            onClick={() => sortByTagName(name)}
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TagIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={name}/>
                                </ListItemButton>
                            </ListItem>
                        </span>
                    ))
                )}

            </List>
        </SideBlock>
    );
};
