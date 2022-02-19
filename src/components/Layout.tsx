import {
  Stack,
  StackProps,
  Box,
  BoxProps,
  TypographyProps,
  Typography,
  CircularProgress,
} from "@mui/material";

interface PageContentProps extends BoxProps {}
export function PageContent(props: PageContentProps) {
  return <Box p={2} flex={1} overflow="scroll" {...props} />;
}

interface PageHeaderProps extends BoxProps {}
export function PageHeader(props: PageHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={4}
      py={2}
      mb={2}
      borderBottom="1px solid #ddd"
      {...props}
    />
  );
}

interface PageProps extends StackProps {
  children?: React.ReactNode;
}
export function Page(props: PageProps) {
  return <Stack direction="row" height="100vh" overflow="hidden" {...props} />;
}

interface PageTitleProps extends TypographyProps {}
export function PageTitle(props: PageTitleProps) {
  return <Typography variant="h5" {...props} />;
}

interface SpacerProps extends BoxProps {}
export function Spacer(props: SpacerProps) {
  return <Box flex={1} justifySelf="stretch" alignSelf="stretch" {...props} />;
}

interface CenterProps extends BoxProps {}
export function Center(props: CenterProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
}

interface FullscreenLoaderProps extends BoxProps {
  label?: string;
}
export function FullscreenLoader({ label, ...props }: FullscreenLoaderProps) {
  return (
    <Center dir="column" height="100vh" {...props}>
      <VStack spacing={3}>
        <CircularProgress />
        {label && <Typography>{label}</Typography>}
      </VStack>
    </Center>
  );
}

export function HStack(props: StackProps) {
  return <Stack direction="row" alignItems="center" {...props} />;
}

export function VStack(props: StackProps) {
  return <Stack direction="column" alignItems="center" {...props} />;
}
