import React, { useRef, useEffect } from "react";
import { Box, Text, useStderr } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { useMouse } from "@zenobius/ink-mouse";

export function RightPanel() {
  return (
    <Box flexGrow={1} borderStyle="single" flexDirection="column" paddingX={1}>
      <Text bold>Right Panel Page 1</Text>
    </Box>
  );
}

export function RightPanel2() {
  const scrollRef = useRef<ScrollViewRef>(null);
  const mouse = useMouse();
  const { stdout } = useStderr();

  function handleScroll(
    position: ReturnType<typeof useMouse>["position"],
    action: ReturnType<typeof useMouse>["scroll"],
  ) {
    switch (action) {
      case "scrolldown":
        scrollRef.current?.scrollBy(1);
        break;
      case "scrollup":
        scrollRef.current?.scrollBy(-1);
        break;
    }
  }

  useEffect(() => {
    const handleResize = () => scrollRef.current?.remeasure();
    stdout?.on("resize", handleResize);
    mouse.events.on("scroll", handleScroll);
    return () => {
      stdout?.off("resize", handleResize);
      mouse.events.off("scroll", handleScroll);
    };
  }, [stdout]);

  return (
    <ScrollView
      ref={scrollRef}
      flexGrow={1}
      borderStyle="single"
      flexDirection="column"
      paddingX={1}
    >
      <Text bold>{getLoremIpsum()}</Text>
    </ScrollView>
  );
}

function getLoremIpsum() {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit efficitur justo, quis semper ipsum cursus id. Morbi eu nulla egestas, aliquet eros vel, hendrerit velit. Etiam ullamcorper augue ut suscipit ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc lobortis sem dignissim lectus ultrices, quis iaculis augue tempor. Nam maximus dui eu cursus imperdiet. Quisque at sollicitudin lorem. Suspendisse potenti. Maecenas non augue venenatis, rhoncus sem a, luctus libero. Suspendisse posuere efficitur metus ultricies blandit. Vivamus porta dui non augue suscipit, vel sagittis magna aliquet. Vestibulum vitae dui eu dolor elementum blandit. Suspendisse sagittis venenatis tempus. Mauris ac augue placerat lorem mollis mattis.

Nulla suscipit lorem nibh, vel aliquam magna tempor et. Pellentesque euismod, nisl in eleifend pulvinar, nisi urna pharetra orci, in tempor lorem nisi sed sem. Quisque ut nisi eu elit accumsan lacinia nec ut erat. Etiam in venenatis quam. Fusce sit amet sapien rutrum, laoreet mi ut, laoreet lorem. Morbi in tortor quis tortor dignissim luctus. Suspendisse fringilla lectus a mi posuere malesuada. Mauris a massa vel nunc gravida tincidunt. Ut quis tincidunt lorem. Nunc tempus lacinia dolor, quis malesuada purus convallis ac. Sed pulvinar velit eu turpis maximus aliquam. Suspendisse consectetur nisi quis tempus mollis. Praesent urna massa, commodo venenatis augue vel, imperdiet dictum risus. Nulla mi dolor, pretium non dignissim a, imperdiet non leo.

Fusce vel nibh feugiat, ultricies tellus id, maximus velit. Phasellus pharetra eget velit vel tincidunt. Praesent neque ipsum, varius sed ornare id, sollicitudin eu augue. Phasellus in eros finibus, tempus lectus eget, commodo arcu. Quisque eget pulvinar quam. Aliquam erat volutpat. Phasellus rhoncus ex nisl, vitae mattis velit hendrerit et. Vivamus hendrerit lectus eget ante ullamcorper rutrum. Nullam viverra eros lacus, quis sodales eros blandit non. Pellentesque dui risus, vestibulum ac sapien vitae, porta efficitur ligula.

Proin consectetur tempus rutrum. Mauris luctus congue nunc at maximus. Aliquam faucibus, orci at tincidunt semper, sapien tellus consectetur lorem, ac efficitur magna lorem a nisl. Vestibulum eu rutrum sem, non auctor turpis. Cras ut lacinia dui. Nunc pretium tincidunt neque vitae tempus. Curabitur urna metus, ornare quis elementum at, volutpat nec libero. Suspendisse aliquet tempus magna, in scelerisque est sagittis at. Nunc sed eros gravida, cursus tellus eu, condimentum eros. Quisque a dolor feugiat, consequat turpis eu, lobortis leo. Vestibulum sagittis viverra magna, auctor iaculis sem malesuada id. In hac habitasse platea dictumst.

Nulla metus purus, iaculis eget luctus a, dapibus eu nisl. Nam finibus finibus sapien, et luctus ipsum varius eget. Ut eget orci vel magna pulvinar euismod. Mauris turpis neque, tincidunt eu placerat et, feugiat quis mauris. Cras mollis sit amet nisi nec tristique. Praesent ornare ullamcorper dolor, nec faucibus sem egestas et. Fusce tristique efficitur nisl eget viverra. Morbi ut neque augue. Cras ac ornare est. Fusce pulvinar quam nulla, cursus dignissim purus interdum vel.

Vivamus nec mauris turpis. Phasellus euismod blandit vestibulum. Proin a rutrum nibh, ac egestas tellus. Mauris placerat scelerisque felis, ut aliquet ipsum interdum a. Vivamus et purus mauris. Pellentesque lectus massa, aliquam ut venenatis eu, pellentesque non lectus. Maecenas cursus scelerisque ullamcorper. Phasellus dictum vitae elit sit amet condimentum. Nullam eu mollis quam. Phasellus eros lacus, aliquam nec risus eget, volutpat cursus neque. Phasellus vehicula quam sed tortor gravida aliquet. Donec mattis elit elit, at vestibulum massa ultricies ac. Nam nec ante nec leo accumsan tincidunt sed sit amet massa. Vestibulum efficitur mollis felis, eget rutrum diam sodales quis. Fusce sollicitudin lacinia magna non commodo.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget fermentum ex, auctor tristique nunc. Phasellus fermentum, nisi quis luctus scelerisque, quam ipsum suscipit quam, eget viverra tortor mauris vel erat. Donec sit amet rutrum turpis. Donec vel tortor interdum, placerat ante eget, dictum tortor. Maecenas at condimentum ipsum. Cras auctor erat nec tellus pretium semper. Nunc quis euismod dui, ut auctor ligula. Vivamus dictum fringilla magna nec sagittis. Nam ut commodo sapien, quis finibus arcu. Ut convallis, ex nec pretium lobortis, tellus est lacinia turpis, eget rhoncus neque elit at tellus. Aliquam finibus sagittis orci.

Maecenas neque eros, lobortis non nisi sed, laoreet efficitur sem. Sed mi velit, ultricies ac risus nec, tristique molestie magna. Nulla facilisi. Nulla sed tellus tincidunt, euismod dui at, eleifend purus. Nulla metus justo, facilisis vel suscipit et, ornare et leo. Nulla sed elit magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus pretium dapibus massa sed aliquet. Duis et arcu dui. Aliquam facilisis orci vitae enim tincidunt, nec tincidunt sapien aliquam. Cras a vehicula odio, id elementum mauris. Donec id vehicula erat, at cursus velit. Nunc sodales, nisi sed varius pretium, tellus sem faucibus nunc, sit amet pellentesque ligula tortor quis odio. Cras et diam vitae urna aliquet dapibus. Aliquam et odio at nisl porttitor fermentum. Integer ultrices, orci eget eleifend malesuada, dui elit euismod est, vitae facilisis mi nibh ut leo.

Integer pellentesque luctus pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sagittis metus vel dictum molestie. Integer egestas sit amet magna ac hendrerit. Pellentesque posuere, magna vitae efficitur ullamcorper, elit tellus ornare leo, a sodales lectus nunc dapibus dui. Curabitur semper risus sed enim vestibulum, vehicula iaculis felis tempor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent in metus eu augue ultricies molestie. In feugiat, magna pulvinar euismod tempus, dui sem placerat purus, in fermentum augue odio in urna. Cras consectetur faucibus dolor, nec elementum ipsum. Aenean at sollicitudin purus. Maecenas vulputate ut erat in fringilla. Morbi sit amet nulla ut sem malesuada finibus in non sem. Vivamus orci elit, aliquet at fermentum in, laoreet ac enim. Sed ac quam mauris. In laoreet, dolor ac tincidunt pretium, elit dui molestie nisi, a efficitur nulla velit ac velit.

Donec a volutpat orci, ut vestibulum est. Nam fermentum odio in purus molestie auctor. Sed mollis dui nec nisi aliquam efficitur. Aenean quis dolor tortor. Proin metus lectus, dignissim at ultrices a, varius nec erat. Pellentesque at eros sollicitudin nunc dapibus congue. Vivamus hendrerit mauris quam, sed rutrum dolor viverra sed. Duis viverra semper est, vitae pretium tellus maximus ullamcorper.`;
}
