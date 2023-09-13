#version 460 core

#include <flutter/runtime_effect.glsl>

precision mediump float;

uniform vec2 from;
uniform vec2 to;
uniform float thickness;

out vec4 fragColor;

float rounded_line_segment(in vec2 p, in vec2 a, in vec2 b) {
	vec2 ba = b - a;
	vec2 pa = p - a;
	float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
	return length(pa - h * ba);
}

void main() {
  vec2 pos = FlutterFragCoord().xy;
  float d = rounded_line_segment(pos, from, to) - thickness*0.5;
  vec3 color = vec3(smoothstep(0, 0.2, d)); // antialiasing
  fragColor = vec4(color, 1);
}
