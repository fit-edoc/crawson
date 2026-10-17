/**
 * Isometric projection math and SVG path generator helpers
 * Standard 30-degree isometric projection:
 * screenX = originX + (x - y) * cos(30°)
 * screenY = originY + (x + y) * sin(30°) - z
 */

export const COS30 = Math.cos(Math.PI / 6); // ~0.8660254
export const SIN30 = Math.sin(Math.PI / 6); // 0.5

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Projects a 3D isometric coordinate (x, y, z) into 2D SVG canvas coordinate
 */
export function projectIso(
  x: number,
  y: number,
  z: number = 0,
  originX: number = 0,
  originY: number = 0
): Point2D {
  return {
    x: Math.round((originX + (x - y) * COS30) * 10) / 10,
    y: Math.round((originY + (x + y) * SIN30 - z) * 10) / 10,
  };
}

/**
 * Generates an SVG path string for a flat isometric rectangle lying on the XY plane at height z.
 * (x, y) is top-left in isometric space, w is width along X axis, h is length along Y axis.
 */
export function getIsoPlanePath(
  ox: number,
  oy: number,
  w: number,
  h: number,
  z: number = 0
): string {
  const p0 = projectIso(0, 0, z, ox, oy);
  const p1 = projectIso(w, 0, z, ox, oy);
  const p2 = projectIso(w, h, z, ox, oy);
  const p3 = projectIso(0, h, z, ox, oy);

  return `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
}

/**
 * Generates SVG path strings for an isometric box / block with top, left, and right faces.
 */
export function getIsoBoxPaths(
  ox: number,
  oy: number,
  w: number,
  h: number,
  depth: number,
  z: number = 0
) {
  // Top face vertices (at z + depth)
  const t0 = projectIso(0, 0, z + depth, ox, oy);
  const t1 = projectIso(w, 0, z + depth, ox, oy);
  const t2 = projectIso(w, h, z + depth, ox, oy);
  const t3 = projectIso(0, h, z + depth, ox, oy);

  // Bottom face vertices (at z)
  const b1 = projectIso(w, 0, z, ox, oy);
  const b2 = projectIso(w, h, z, ox, oy);
  const b3 = projectIso(0, h, z, ox, oy);

  const topFace = `M ${t0.x} ${t0.y} L ${t1.x} ${t1.y} L ${t2.x} ${t2.y} L ${t3.x} ${t3.y} Z`;
  const leftFace = `M ${t3.x} ${t3.y} L ${t2.x} ${t2.y} L ${b2.x} ${b2.y} L ${b3.x} ${b3.y} Z`;
  const rightFace = `M ${t2.x} ${t2.y} L ${t1.x} ${t1.y} L ${b1.x} ${b1.y} L ${b2.x} ${b2.y} Z`;

  return { topFace, leftFace, rightFace };
}

/**
 * Generates SVG line path along isometric grid
 */
export function getIsoLinePath(
  p1: Point3D,
  p2: Point3D,
  ox: number = 0,
  oy: number = 0
): string {
  const start = projectIso(p1.x, p1.y, p1.z, ox, oy);
  const end = projectIso(p2.x, p2.y, p2.z, ox, oy);
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}
