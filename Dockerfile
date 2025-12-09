# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the project
COPY . .

# 6. Generate Prisma client
RUN npx prisma generate

# 7. Build Next.js
RUN npm run build

# 8. Expose Next.js port
EXPOSE 3000

# 9. Start production server
CMD ["npm", "start"]
