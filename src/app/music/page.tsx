export default function MusicPage() {
  return (
    <>
      <h1 className="p-10 text-center text-3xl sm:text-5xl">My Playlist</h1>
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        style={{
          width: "100%",
          maxWidth: "690px",
          overflow: "hidden",
          borderRadius: "10px",
          background: "transparent",
        }}
        className="m-auto"
        height={"450"}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="https://embed.music.apple.com/us/playlist/favorite-songs/pl.u-JjUDWYlvaa?theme=dark"
      ></iframe>
    </>
  );
}
