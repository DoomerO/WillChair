import { Flex, Spinner, Skeleton, SkeletonText, SkeletonCircle, ResponsiveValue } from "@chakra-ui/react";
import colors from "../../colors/colors";

interface CompLoad {
    width?: ResponsiveValue<string>,
    height?: ResponsiveValue<string>,
    type?: string
}

const ComponentLoading = ({ width = "100%", height = "100%" , type = "default" }: CompLoad) => {

    const LoadingType = () => {
        switch (type) {
            case "skeleton":
                return <Skeleton height="100%" width="100%" />
            case "skeleton-circle":
                return <SkeletonCircle size="100%" height="100%" width="100%" />
            case "skeleton-text":
                return <SkeletonText noOfLines={8} spacing={4} skeletonHeight={4}/>
            default:
                return <Spinner size="xl" thickness='4px' speed='0.75s' emptyColor={colors.slideMsgBg} color={colors.colorFontBlue} />
        }
    }

    return (
        <Flex w={width} h={height} justifyContent="center" align="center" direction="column">
            <LoadingType />
        </Flex>
    )
}

export default ComponentLoading;