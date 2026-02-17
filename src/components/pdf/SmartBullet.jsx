import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 4,
  },
  bullet: {
    width: 10,
    fontSize: 9.5,
    fontFamily: "Roboto",
  },
  content: {
    fontSize: 9.5,
    fontFamily: "Roboto",
    flex: 1,
    lineHeight: 1.4,
    color: "#2d2d2d",
  },
  bold: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});

const SmartBullet = ({ highlight }) => {
  const { full_text, tech_stack } = highlight;

  // If no tech stack, just render plain text
  if (!tech_stack || tech_stack.length === 0) {
    return (
      <View style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.content}>{full_text}</Text>
      </View>
    );
  }

  // Escape regex special characters in tech names
  const escaped = tech_stack.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = full_text.split(pattern);

  return (
    <View style={styles.bulletPoint}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.content}>
        {parts.map((part, i) => {
          const isKeyword = tech_stack.some(
            (tech) => tech.toLowerCase() === part.toLowerCase(),
          );
          return (
            <Text key={i} style={isKeyword ? styles.bold : {}}>
              {part}
            </Text>
          );
        })}
      </Text>
    </View>
  );
};

export default SmartBullet;
