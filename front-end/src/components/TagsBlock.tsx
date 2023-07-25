import React, {FC} from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import {SideBlock} from "./SideBlock";

type TagsBlockPropsType = {
    items: string[]
    isLoading: boolean
}

export const TagsBlock: FC<TagsBlockPropsType> = ({items, isLoading = true}) => {
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
                        <a
                            key={name}
                            style={{textDecoration: "none", color: "black"}}
                            href={`/tags/${name}`}
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TagIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={name}/>
                                </ListItemButton>
                            </ListItem>
                        </a>
                    ))
                )}

            </List>
        </SideBlock>
    );
};
