import { addToast, Button } from "@heroui/react";

const Toast = ({ color }: { color: string }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        key={color}
        color={
          color.toLowerCase() as
            | "default"
            | "primary"
            | "secondary"
            | "success"
            | "warning"
            | "danger"
        }
        variant={"flat"}
        onPress={() =>
          addToast({
            title: "Toast title",
            description: "Toast displayed successfully",
            color: color.toLowerCase() as
              | "default"
              | "foreground"
              | "primary"
              | "secondary"
              | "success"
              | "warning"
              | "danger"
              | undefined,
          })
        }
      >
        {color}
      </Button>
    </div>
  );
};
export default Toast;
