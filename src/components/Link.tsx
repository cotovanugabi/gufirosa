import { styled } from "@mui/system";
import NextLink from "next/link";
import { ReactNode } from "react";

interface InternalLinkProps {
  href: string;
  children?: ReactNode;
}

const StyledLink = styled("a")(
  ({ theme }) => `
  display: inline-flex;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border-radius: 6px;
  padding: 6px;
  &:hover {
    background: ${theme.palette.grey[100]};
  }
  `
);

export function Link({ href, ...props }: InternalLinkProps) {
  return (
    <NextLink passHref href={href!}>
      <StyledLink {...props} />
    </NextLink>
  );
}
