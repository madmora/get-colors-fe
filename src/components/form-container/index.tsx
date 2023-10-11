import LoadingModal from "components/loading-modal";
import Primitives, { HtmlProps } from "primitives";
import React from "react";
import { AppConstants } from "utils/constants";

type ContainerType = "primary" | "full";

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
  loading?: boolean;
  successModal?: React.ReactNode;
  customContainerStyle?: HtmlProps;
  customInnerContainerStyle?: HtmlProps;
  containerType?: ContainerType;
}

const titleStyled: HtmlProps = {
  as: "h1",
  fontSize: [6, 6, 8, 10],
  m: 0,
  mb: 4,
  textAlign: "center",
  color: "orange",
};

const containerStyled: HtmlProps = {
  width: 1,
  minHeight: AppConstants.PAGE_MIN_HEIGHT,
  p: [0, 4],
  justifyContent: "center",
  justifyItems: "center",
};

const innerContainerStyled: HtmlProps = {
  p: [3, 4],
  maxWidth: "1000px",
  boxShadow: ["none", "0px 1px 8px 2px rgba(0,0,0,0.2)"],
  alignSelf: "flex-start",
};

const FormContainer = ({
  children,
  title,
  loading,
  successModal,
  customContainerStyle,
  customInnerContainerStyle,
  containerType = "primary",
}: FormContainerProps) => {
  const innerContainer = containerType === "full" ? {} : innerContainerStyled;

  return (
    <>
      <Primitives.Flex {...containerStyled} {...customContainerStyle}>
        <Primitives.Box {...innerContainer} {...customInnerContainerStyle}>
          {title && <Primitives.Text {...titleStyled}>{title}</Primitives.Text>}
          <Primitives.Box>{children}</Primitives.Box>
        </Primitives.Box>
      </Primitives.Flex>
      <LoadingModal loading={loading || false} />
      {successModal && <>{successModal}</>}
    </>
  );
};

export default FormContainer;
