/*******************************************************
 * TOPIC: TYPED ARRAYS & ArrayBuffer
 *
 * A regular JS array can hold anything, resizes freely,
 * and stores each element as a full JS value — flexible,
 * but not memory-efficient. Typed arrays are FIXED-size,
 * FIXED-type views over a raw block of binary memory —
 * used for binary data: file contents, WebSocket payloads,
 * images/audio, WebGL buffers, etc.
 *
 * Covers:
 *  1. ArrayBuffer — the raw memory block
 *  2. Typed array views (Int8Array, Float64Array, ...)
 *  3. Multiple views over the SAME buffer
 *  4. DataView — reading mixed types at specific offsets
 *  5. When you'd actually reach for these
 *******************************************************/


/********************************************************
 * 1️⃣ ArrayBuffer — RAW MEMORY, NO INTERPRETATION
 *
 * An ArrayBuffer is just a fixed-length block of bytes.
 * You CANNOT read/write it directly — it has no methods
 * for that. You always access it THROUGH a "view".
 ********************************************************/

const buffer = new ArrayBuffer(16); // 16 bytes of raw memory, all zeroed
console.log(buffer.byteLength);     // 16
console.log(buffer);                // ArrayBuffer { [Uint8Contents]: <00 00 00 00 ...>, byteLength: 16 }


/********************************************************
 * 2️⃣ TYPED ARRAY VIEWS
 *
 * A typed array interprets an ArrayBuffer's bytes as a
 * specific numeric type. The type determines how many
 * bytes each element takes, and therefore how many
 * elements fit in the same buffer.
 ********************************************************/

const int8View = new Int8Array(buffer);    // each element = 1 byte -> 16 elements
const int32View = new Int32Array(buffer);  // each element = 4 bytes -> 4 elements
const float64View = new Float64Array(buffer); // each element = 8 bytes -> 2 elements

console.log(int8View.length);   // 16
console.log(int32View.length);  // 4
console.log(float64View.length); // 2

// You can also create a typed array WITHOUT an existing buffer —
// it allocates its own buffer automatically:
const scores = new Uint8Array([10, 25, 255, 300]); // 300 doesn't fit in a Uint8 (max 255)
console.log(scores); // Uint8Array(4) [10, 25, 255, 44] — 300 wraps around (300 - 256 = 44)


/********************************************************
 * 3️⃣ MULTIPLE VIEWS OVER THE SAME BUFFER
 *
 * Because typed arrays are VIEWS (not copies), writing
 * through one view is immediately visible through any
 * OTHER view over the same underlying buffer.
 ********************************************************/

const sharedBuffer = new ArrayBuffer(4);
const asInt32 = new Int32Array(sharedBuffer);
const asUint8 = new Uint8Array(sharedBuffer);

asInt32[0] = 1; // writes the number 1 into all 4 bytes, interpreted as a 32-bit integer
console.log(asUint8); // Uint8Array(4) [1, 0, 0, 0] — same 4 bytes, viewed 1-byte-at-a-time (little-endian)


/********************************************************
 * 4️⃣ DataView — READING MIXED TYPES AT SPECIFIC OFFSETS
 *
 * Typed arrays assume EVERY element is the same type.
 * DataView lets you read/write different types at
 * different byte offsets in the same buffer — common when
 * parsing a binary file format with a mixed-type header.
 ********************************************************/

const headerBuffer = new ArrayBuffer(8);
const view = new DataView(headerBuffer);

view.setUint16(0, 42);      // bytes 0-1: a 16-bit value
view.setFloat32(2, 3.14);   // bytes 2-5: a 32-bit float
view.setInt8(6, -5);        // byte 6: a signed 8-bit value

console.log(view.getUint16(0));  // 42
console.log(view.getFloat32(2)); // ~3.140000104904175 (float32 precision loss is normal)
console.log(view.getInt8(6));    // -5


/********************************************************
 * 5️⃣ WHEN YOU'D ACTUALLY REACH FOR THESE
 *
 * - Processing files read via the File API / fetch's
 *   .arrayBuffer() (images, audio, PDFs)
 * - WebSocket binary messages
 * - WebGL/Canvas pixel data, audio sample buffers
 * - Any time memory layout or interop with non-JS binary
 *   data (WASM, native formats) matters
 *
 * For everyday application data, regular arrays remain
 * the right choice — typed arrays trade flexibility for
 * memory efficiency and binary-format precision.
 ********************************************************/


/********************************************************
 * 6️⃣ INTERVIEW NOTES
 *
 * ✔ ArrayBuffer = raw bytes, no direct read/write API.
 * ✔ Typed arrays = fixed-type, fixed-length VIEWS over a buffer.
 * ✔ Multiple views can share one buffer — writes through
 *   one are visible through all of them.
 * ✔ DataView is for mixed-type/offset access; a single
 *   typed array assumes uniform type throughout.
 * ✔ Typed array values silently WRAP on overflow instead
 *   of throwing (300 into a Uint8Array became 44 above) —
 *   a common source of subtle bugs if not expected.
 *
 * KEY: typed arrays exist for working with raw binary
 * data efficiently — not as a general-purpose array
 * replacement.
 ********************************************************/
