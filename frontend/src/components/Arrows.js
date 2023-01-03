import React from "react";
import CurvedArrow from "./CurvedArrow";

const computeCoords = (index, numSeats) => {
  const x = Math.sin(index * ((2 * Math.PI) / numSeats)) * 300;
  const y = Math.cos(index * ((2 * Math.PI) / numSeats)) * 300;
  return [x, y];
};

const computeOffset = (index, count, numSeats) => {
  const odd = count % 2 === 0;
  const offset_index = count % (20 - numSeats);
  const offset_scale = offset_index * (20 / numSeats) * 4;
  var x =
    -Math.sin(index * ((2 * Math.PI) / numSeats)) *
    (12 + Math.pow(offset_index, 1 + 3 / numSeats));
  var y =
    -Math.cos(index * ((2 * Math.PI) / numSeats)) *
    (12 + Math.pow(offset_index, 1 + 3 / numSeats));

  if (odd) {
    x += Math.cos(index * ((2 * Math.PI) / numSeats)) * offset_scale;
    y += -Math.sin(index * ((2 * Math.PI) / numSeats)) * offset_scale;
  } else {
    x += -Math.cos(index * ((2 * Math.PI) / numSeats)) * offset_scale;
    y += Math.sin(index * ((2 * Math.PI) / numSeats)) * offset_scale;
  }
  return [x, y];
};

const computeMidOffset = (index1, index2, numSeats) => {
  const [x1, y1] = computeCoords(index1, numSeats);
  const [x2, y2] = computeCoords(index2, numSeats);
  const mid_x = (x1 + x2) / 2;
  const mid_y = (y1 + y2) / 2;
  return [-mid_x * 0.8, -mid_y * 0.8];
};

const Arrows = (props) => {
  const paired_edges = [];
  for (let i = 0; i < props.edges.length - 1; i++) {
    paired_edges.push([props.edges[i], props.edges[i + 1]]);
  }
  const seat_counts = {};

  return paired_edges.map((edge, ind) => {
    const seatIndex1 = props.seats.findIndex(
      (student) => student.id === edge[0]
    );
    const seatIndex2 = props.seats.findIndex(
      (student) => student.id === edge[1]
    );

    if (seatIndex1 !== -1 && seatIndex2 !== -1) {
      if (!seat_counts[seatIndex1]) {
        seat_counts[seatIndex1] = 0;
      }
      if (!seat_counts[seatIndex2]) {
        seat_counts[seatIndex2] = 0;
      }
      const [off_midx, off_midy] = computeMidOffset(
        seatIndex1,
        seatIndex2,
        props.seats.length
      );

      const [off_x1, off_y1] = computeOffset(
        seatIndex1,
        seat_counts[seatIndex1],
        props.seats.length
      );
      const [off_x2, off_y2] = computeOffset(
        seatIndex2,
        seat_counts[seatIndex2],
        props.seats.length
      );

      seat_counts[seatIndex1] += 1;
      seat_counts[seatIndex2] += 1;

      return (
        <CurvedArrow
          key={ind}
          fromSelector={`[id='${seatIndex1}']`}
          toSelector={`[id='${seatIndex2}']`}
          color={"#9DB5B2"}
          fromOffsetX={off_x1}
          fromOffsetY={off_y1}
          toOffsetX={off_x2}
          toOffsetY={off_y2}
          width={2}
          size={15}
          middleX={off_midx}
          middleY={off_midy}
          dynamicUpdate="true"
        />
      );
    }
  });
};

export default Arrows;
