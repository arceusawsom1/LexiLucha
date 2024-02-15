    # Use an official Node.js runtime as the base image
    FROM node:16 as builder

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and package-lock.json to the working directory
    COPY package.json package-lock.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application code to the working directory
    COPY . .

    # Build the Vite project
    # RUN npm run build
    RUN npm run dev --port 80 --host
    #Stage 2
    # FROM nginx:1.19.0
    # RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig
    # COPY nginx.conf /etc/nginx/nginx.conf
    # WORKDIR /usr/share/nginx/html
    # RUN rm -rf ./*
    # COPY --from=builder /app/dist .
    # ENTRYPOINT ["nginx", "-g", "daemon off; "]
