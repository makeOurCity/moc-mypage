import React, { ReactNode } from "react";
import {
  Avatar,
} from "@chakra-ui/react";
import md5 from 'md5';

interface GravatarIconProps {
  email: string;
  size?: number;
  alt?: string;
}

const GravatarIcon: React.FC<GravatarIconProps> = ({ email, size = 80, alt="Gravatar" }) => {
  const hash = md5(email.trim().toLowerCase());
  const url = `https://www.gravatar.com/avatar/${hash}?s=${size}`;

  return <Avatar size={"sm"} src={url} />;
};

export default GravatarIcon;
