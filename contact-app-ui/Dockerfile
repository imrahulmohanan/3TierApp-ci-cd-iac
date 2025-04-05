#Build the UI app
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

#Create the image to be published
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .

RUN npm install --omit=dev

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
