import React from "react";
import CurvedArrow from "./CurvedArrow";

const computeCoords = (index, numSeats) => {
  const x = Math.sin(index * ((2 * Math.PI) / numSeats)) * 300;
  const y = Math.cos(index * ((2 * Math.PI) / numSeats)) * 300;
  return [x, y];
};

const Arrows = (props) => {
  const paired_edges = [];
  for (let i = 0; i < props.edges.length - 1; i++) {
    paired_edges.push([props.edges[i], props.edges[i + 1]]);
  }
  return paired_edges.map((edge, ind) => {
    const seatIndex1 = props.seats.findIndex(
      (student) => student.id == edge[0]
    );
    const seatIndex2 = props.seats.findIndex(
      (student) => student.id == edge[1]
    );
    if (seatIndex1 !== -1 && seatIndex2 !== -1) {
      const [x1, y1] = computeCoords(seatIndex1, props.seats.length);
      const [x2, y2] = computeCoords(seatIndex2, props.seats.length);

      const mid_x = (x1 + x2) / 2;
      const mid_y = (y1 + y2) / 2;

      return (
        <CurvedArrow
          key={ind}
          fromSelector={`[id='${seatIndex1}']`}
          toSelector={`[id='${seatIndex2}']`}
          color={"#9DB5B2"}
          width={2}
          size={15}
          middleY={-mid_y * 0.8}
          middleX={-mid_x * 0.8}
          dynamicUpdate="true"
        />
      );
    }
  });
};

export default Arrows;
