FROM php:8.2-fpm-buster

# install php dependencies
RUN set -ex \
    && buildDeps=" \
        libicu-dev \
        zlib1g-dev \
        libzip-dev \
        libonig-dev \
        default-mysql-client \
        libxslt-dev \
        libpng-dev \
    " \
    && apt-get update -y \
    && apt-get install -y --no-install-recommends \
        $buildDeps \
        ca-certificates \
        cron \
        git \
        nano \
        openssh-client \
        libzip4 \
        rsync \
        unzip
RUN docker-php-ext-install \
        pdo pdo_mysql zip xsl gd intl opcache exif mbstring
RUN pecl install apcu xdebug \
    && pecl clear-cache \
    && docker-php-ext-enable apcu
RUN apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false -o APT::AutoRemove::SuggestsImportant=false $buildDeps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


#RUN apt-get update && apt-get install -y \
#    gnupg \
#    g++ \
#    procps \
#    openssl \
#    git \
#    unzip \
#    zlib1g-dev \
#    libzip-dev \
#    libfreetype6-dev \
#    libpng-dev \
#    libjpeg-dev \
#    libicu-dev  \
#    libonig-dev \
#    libxslt1-dev \
#    acl
#
#RUN docker-php-ext-configure gd --with-jpeg --with-freetype
#
#RUN docker-php-ext-install \
#    pdo pdo_mysql zip xsl gd intl opcache exif mbstring
#
## Install xdebug
#RUN pecl install -f xdebug \
#    && docker-php-ext-enable xdebug

# add xdebug config
RUN docker-php-ext-enable xdebug \
    && echo "xdebug.client_port=9000" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.discover_client_host=false" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.idekey=PHPSTORM" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.mode=develop,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.log=/var/log/xdebug.log" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.log_level=0" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini


# add symfony performance config, see http://symfony.com/doc/current/performance.html
RUN echo "short_open_tag=off" >> /usr/local/etc/php/zdocker.ini \
    && echo "memory_limit=-1" >> /usr/local/etc/php/conf.d/zdocker.ini \
    && echo "error_reporting=E_ALL" >> /usr/local/etc/php/conf.d/zdocker.ini \
    && echo "date.timezone=Europe/Berlin" >> /usr/local/etc/php/conf.d/zdocker.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/zdocker.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/zdocker.ini \
    && echo "realpath_cache_size=4096K" >> /usr/local/etc/php/conf.d/zdocker.ini \
    && echo "realpath_cache_ttl=600" >> /usr/local/etc/php/conf.d/zdocker.ini

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && mkdir -p /var/www/.composer

# set entrypoint to install composer
COPY /entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["php-fpm", "-F"]

# Copy content into container and set working directory
COPY . /var/www/api
WORKDIR /var/www/api

# Expose port 9000
EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]