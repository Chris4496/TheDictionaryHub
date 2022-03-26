import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { dict } from "../types";

function NavBar(props: { dictList: dict[] }) {
  const dictList = props.dictList;
  return (
    <Breadcrumb
      fontWeight="medium"
      fontSize="lg"
      borderRadius="xl"
      m="3"
      py="2"
      px="4"
      boxShadow="lg"
    >
      {[...dictList].map((dict) => (
        <BreadcrumbItem key={dict.name}>
          <BreadcrumbLink href={`#${dict.name}`}>
            {dict.name[0].toUpperCase() + dict.name.slice(1)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default NavBar;
