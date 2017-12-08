AFRAME.registerShader('top-bottom', {
  schema: {
    // the texture source (probably a video)
    src: { type: 'map', is: 'uniform' },
    // texture parameters
    opacity: { type: 'number', is: 'uniform', default: 1 },
  },

  vertexShader:
`
varying float whichEye;
varying vec2 vUV;
void main(void) {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUV = uv;
  whichEye = projectionMatrix[2][0];
}
`,
  fragmentShader:
`
uniform sampler2D src;
uniform float opacity;
varying float whichEye;
varying vec2 vUV;
void main() {
  vec2 offset = vec2(0, 0);
  vec2 repeat = vec2(1, 2);
  vec4 color;
  if (whichEye < 0.0) offset.y = 0.5; 
  color = texture2D(src, vec2(vUV.x / repeat.x + offset.x, vUV.y / repeat.y + offset.y));
  gl_FragColor = vec4(color.rgb, color.a * opacity);
}
`
});
